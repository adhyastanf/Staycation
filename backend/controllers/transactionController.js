import { nanoid } from 'nanoid';
import snap from '../helpers/snapMidtrans.js';
import Hotel from '../model/hotel.js';
import User from '../model/user.js';
import 'dotenv';
import Transaction from '../model/transaction.js';
import crypto from 'crypto';
import Guest from '../model/guest.js';

const createTransaction = async (req, res) => {
  const { user_id } = req.user;
  const { product_id, bookingStartDate, bookingEndDate, night } = req.body;

  try {
    const user = await User.findByPk(user_id, { attributes: ['id', 'fullname', 'email'] });

    const product = await Hotel.findByPk(product_id);

    const transaction_id = `TRX-${nanoid(4)}-${nanoid(8)}`;

    if (!product || product.unit <= 0) {
      return res.status(400).json({
        status: 'error',
        code: res.statusCode,
        message: 'Staycation is not available',
      });
    }

    let parameter = {
      item_details: {
        id: product?.id,
        name: product?.title,
        price: product?.price,
        quantity: night,
      },
      transaction_details: {
        order_id: transaction_id,
        gross_amount: product?.price * night,
      },
      customer_details: {
        first_name: user?.fullname,
        email: user?.email,
      },
      // callbacks: {
      //   finish: `${process.env.FRONT_END_URL}`,
      //   error: `${process.env.FRONT_END_URL}`,
      //   pending: `${process.env.FRONT_END_URL}`,
      // },
    };

    const authString = btoa(process.env.SERVER_KEY_MIDTRANS);

    const response = await fetch(`${process.env.MIDTRANS_URL}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(parameter),
    });

    const data = await response.json();

    if (response.status !== 201) {
      return res.status(500).json({
        status: 'error',
        code: res.statusCode,
        message: 'Failed to create transaction',
      });
    }

    const guest = await Guest.create({
      hotelId: product_id,
      userId: user_id,
      checkInDate: bookingStartDate,
      checkOutDate: bookingEndDate,
    });

    // Buat data transaksi
    const resData = {
      id: transaction_id,
      status: 'PENDING',
      payment_method: data?.payment_method || '',
      snap_token: data.token,
      snap_redirect_url: data.redirect_url,
      price: product.price * night,
      guestId: guest.id,
      night
    };

    await Transaction.create(resData);

    // Subtract 1 unit
    await Hotel.update({ unit: product.unit - 1 }, { where: { id: product_id } });

    return res.status(200).json({
      code: res.statusCode,
      message: 'snap successfull',
      data: resData,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      message: err.message,
    });
  }
};

const getAllTransaction = async (req, res) => {
  const { user_id } = req.user;
  const { status = '' } = req.query;

  try {
    const conditionStatus = {};

    if (status) {
      conditionStatus.status = status.toUpperCase();
    }

    const transaction = await Transaction.findAll({
      where: conditionStatus,
      include: [
        {
          model: Guest,
          attributes: ['id', 'checkInDate', 'checkOutDate', 'userId'],
          include: [{ model: Hotel, attributes: ['id', 'title', 'img_url', 'city', 'country', 'createdAt', 'updatedAt'] }],
          where: { userId: user_id },
        },
      ],
    });

    const formattedArray = transaction.map((val) => {
      return {
        id: val.id,
        status: val.status,
        payment_method: val.payment_method || '',
        snap_token: val.snap_token,
        snap_redirect_url: val.snap_redirect_url,
        price: val.price,
        night: val.night,
        guestId: val.guestId,
        checkInDate: val.Guest.checkInDate,
        checkOutDate: val.Guest.checkOutDate,
        createdAt: val.createdAt,
        updatedAt: val.updatedAt,
        userId: val.Guest.userId,
        Hotel: val.Guest.Hotel,
      };
    });

    return res.status(200).json({
      code: res.statusCode,
      message: 'Get All Transaction successfull',
      data: formattedArray,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      message: err.message,
    });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { transaction_id } = req.params;

    const transaction = await Transaction.findOne({
      where: { id: transaction_id },
      include: [
        {
          model: Guest,
          attributes: ['id', 'checkInDate', 'checkOutDate', 'hotelId', 'userId'],
          where: { userId: user_id },
          include: [{ model: Hotel, attributes: ['id', 'title', 'img_url', 'city', 'country', 'isPopular', 'createdAt'] }],
        },
      ],
    });

    const formattedArray = {
      id: transaction.id,
      status: transaction.status,
      payment_method: transaction.payment_method || '',
      snap_token: transaction.snap_token,
      snap_redirect_url: transaction.snap_redirect_url,
      price: transaction.price,
      guestId: transaction.guestId,
      checkInDate: transaction.Guest.checkInDate,
      checkOutDate: transaction.Guest.checkOutDate,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      userId: transaction.Guest.userId,
      Hotel: transaction.Guest.Hotel,
    };

    if (!transaction) {
      return res.status(404).json({
        code: res.statusCode,
        status: 'error',
        message: 'Detail Transaction not found',
      });
    }

    return res.status(200).json({
      code: res.statusCode,
      status: 'success',
      message: 'Detail Transaction has Found',
      data: formattedArray,
    });
  } catch (err) {
    return null;
  }
};

async function updateTransactionStatus({ transaction_id, status, payment_method = null }) {
  return await Transaction.update(
    {
      status,
      payment_method,
    },
    {
      where: {
        id: transaction_id,
      },
    }
  );
}

const updateStatusBasedOnMidtransResponse = async (transaction_id, data) => {
  const hash = crypto.createHash('sha512').update(`${transaction_id}${data.status_code}${data.gross_amount}${process.env.SERVER_KEY_MIDTRANS}`).digest('hex');

  if (data.signature_key !== hash) {
    return {
      status: 'error',
      message: 'Invalid Signature key',
    };
  }

  let responseData = null;
  let transactionStatus = data.transaction_status;
  let fraudStatus = data.fraud_status;

  const transaction = await Transaction.findByPk(transaction_id, {
    include: [{ model: Guest }],
  });
  const product = await Hotel.findByPk(transaction.Guest.hotelId);

  if (!transaction || !product) {
    return {
      status: 'error',
      message: 'Transaction or Product not found',
    };
  }

  if (transactionStatus == 'capture') {
    if (fraudStatus == 'accept') {
      const transaction = await updateTransactionStatus({ transaction_id, status: 'PAID', payment_method: data.payment_type });
      responseData = transaction;
    }
  } else if (transactionStatus == 'settlement') {
    const transaction = await updateTransactionStatus({ transaction_id, status: 'PAID', payment_method: data.payment_type });
    responseData = transaction;
  } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
    const transaction = await updateTransactionStatus({ transaction_id, status: 'CANCELED', payment_method: data.payment_type });
    // Subtract 1 unit
    await Hotel.update({ unit: product.unit + 1 }, { where: { id: transaction.Guest.hotelId } });
    responseData = transaction;
  } else if (transactionStatus == 'pending') {
    const transaction = await updateTransactionStatus({ transaction_id, status: 'PENDING', payment_method: data.payment_type });
    responseData = transaction;
  }

  return {
    status: 'success',
    data: responseData,
  };
};

const trxNotif = async (req, res) => {
  const data = req.body;

  Transaction.findByPk(data.order_id).then((transaction) => {
    if (transaction) {
      updateStatusBasedOnMidtransResponse(transaction.id, data).then((result) => {
        console.log('result', result);
      });
    }
  });

  return res.status(200).json({ code: res.statusCode, status: 'success', message: 'OK' });
};

export { createTransaction, getAllTransaction, updateTransactionStatus, trxNotif, getTransactionById };

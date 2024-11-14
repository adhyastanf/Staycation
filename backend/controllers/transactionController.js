import { nanoid } from 'nanoid';
import snap from '../helpers/snapMidtrans.js';
import Hotel from '../model/hotel.js';
import User from '../model/user.js';
import 'dotenv';
import Transaction from '../model/transaction.js';
import dayjs from 'dayjs';

const createTransaction = async (req, res) => {
  const { user_id } = req.user;
  const { product_id, bookingStartDate, bookingEndDate, night } = req.body;

  const user = await User.findByPk(user_id);

  const product = await Hotel.findByPk(product_id);
  const price = 5000;

  const transaction_id = `TRX-${nanoid(4)}-${nanoid(8)}`;

  let parameter = {
    item_details: {
      id: product?.id,
      name: product?.name,
      price: 5000,
      quantity: night,
    },
    transaction_details: {
      order_id: transaction_id,
      gross_amount: 10000,
    },
    customer_details: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    },
    callbacks: {
      finish: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
      error: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
      pending: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
    },
  };

  const authString = btoa(process.env.SERVER_KEY_MIDTRANS);

  try {
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
    console.log(data);

    if (response.status !== 201) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to create transaction',
      });
    }

    await Transaction.create({
      id: transaction_id,
      bookingStartDate,
      bookingEndDate,
      product_id,
      user_id,
      status: 'PENDING_PAYMENT',
      snap_token: data?.token,
      snap_redirect_url: data?.redirect_url,
      price: product?.price,
      night,
    });

    return res.status(200).json({
      code: res.statusCode,
      msg: 'snap successfull',
      data: {
        id: transaction_id,
        bookingStartDate,
        bookingEndDate,
        product_id,
        user_id,
        status: 'PENDING_PAYMENT',
        snap_token: data?.token,
        snap_redirect_url: data?.redirect_url,
        price: product?.price,
        night,
      },
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findAll();

    return res.status(200).json({
      code: res.statusCode,
      msg: 'snap successfull',
      data: {
        price: transaction[0].price,
        created: transaction[0].createdAt,
        updated: transaction[0].updatedAt,
      },
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

async function updateTransactionStatus({transaction_id, status, payment_method = null}) {
  return prisma.transaction.update({
      where: {
          id: transaction_id
      },
      data: {
          status,
          payment_method
      }
  });
}


export { createTransaction, getTransaction, updateTransactionStatus };

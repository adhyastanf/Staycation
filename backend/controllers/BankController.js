import snap from '../helpers/snapMidtrans.js';

const transactionTokenizer = async (req, res) => {
  const { name, price, quantity } = req.body;

  let parameter = {
    item_details: {
      name,
      price,
      quantity,
    },
    transaction_details: {
      order_id: 'test-transaction-123',
      gross_amount: price * quantity,
    },
  };

  try {
    const token = await snap.createTransactionToken(parameter);

    return res.status(200).json({
      code: res.statusCode,
      msg: 'snap successfull',
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

export { transactionTokenizer };

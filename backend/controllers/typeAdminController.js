import Type from '../model/Type.js';

const createType = async (req, res) => {
  const { type } = req.body;

  try {
    await Type.create({
      type,
    });

    return res.status(200).json({
      code: res.statusCode,
      msg: 'Type has successfully created',
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const updateType = async (req, res) => {
  const body = req.body;
  const { typeId } = req.params;
  try {
    await Type.update(body, { where: { id: typeId } });
    return res.status(200).json({
      code: res.statusCode,
      msg: 'Type has updated',
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const viewType = async (req, res) => {
  try {
    const type = await Type.findAll();
    return res.status(200).json({
      code: res.statusCode,
      msg: 'Get Type successfully',
      data: type,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const deleteType = async (req, res) => {
  const { type, id } = req.body;
  try {
    await Type.destroy({
      where: { type, id },
    });
    return res.status(200).json({
      code: res.statusCode,
      msg: 'Delete Type successfully',
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

export { createType, updateType, viewType, deleteType };

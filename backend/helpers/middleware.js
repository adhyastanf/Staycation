function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({
      code: res.statusCode,
      msg: 'You are not authenticated',
    });

  jwt.verify(token, process.env.TOkEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        code: res.statusCode,
        msg: 'Invalid token',
      });

    req.user = user; 

    next();
  });
}

export { authenticateToken };

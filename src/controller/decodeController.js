exports.getDecodePage = (req, res) => {
  res.render('decode', { result: null });
};

exports.postDecode = (req, res) => {
  const { decodedText } = req.body;

  if (!decodedText || decodedText.trim() === '') {
    return res.render('decode', { result: 'No QR code data submitted.' });
  }

  // In a real app, you could validate or parse the QR code string here
  res.render('decode', { result: decodedText });
};

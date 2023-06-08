import axios from "axios";

export const captchaController = async (req, res) => {
  const { token, secretKey } = req.body;

  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.post(url);

    return res.status(200).json({
      success: true,
      message: "Token successfully verified",
      verification_info: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying token",
    });
  }
};

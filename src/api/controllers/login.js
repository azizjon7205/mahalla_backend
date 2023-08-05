import strapi from 'strapi';

const api = strapi.api;

const login = async (phone_number, password, fcm_token) => {
  const user = await api.xodims.findOne({ phone_number });

  if (!user) {
    return {
      success: false,
      message: 'User not found',
    };
  }

  if (user.password === password) {
    // Update the user's login timestamp
    await api.xodims.update({ id: user.id }, { fcm_token: fcm_token });

    return {
      success: true,
      message: 'User logged in successfully',
    };
  }

  return {
    success: false,
    message: 'Incorrect password',
  };
};

export default login;
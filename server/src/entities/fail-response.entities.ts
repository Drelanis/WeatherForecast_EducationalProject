const failResponse = (message: string, property: any) => {
  return {
    error: true,
    message,
    property,
  };
};

export default failResponse;

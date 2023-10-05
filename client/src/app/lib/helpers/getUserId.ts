const getUserId = (): string | null => {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userID') : null;
  return userId;
};

export default getUserId;

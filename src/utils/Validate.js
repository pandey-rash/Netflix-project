export const Validate = (email,password,name) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);


    if(!isEmailValid) return "Email is invalid";
    if(!isPasswordValid) return "Password is invalid";
    if(!isNameValid) return "Enter a valid Name";

    return null;
};

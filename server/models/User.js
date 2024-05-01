const usersCollection = require("../db").db().collection("users");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

let User = function (data) {
    this.data = data;
    this.errors = [];
};

User.prototype.cleanUp = function () {
    this.data = {
        fullName: this.data.fullName,
        email: this.data.email,
        mobileNo: this.data.mobileNo,
        password: this.data.password,
        role: this.data.role, // user or admin
        // More fields will come later
        userImage: null,
        createdDate: new Date(),
    };
};

User.prototype.signIn = async function(){
    try {
        console.log(this.data.email);
        this.cleanUp();
        const attemptedUser = await usersCollection.findOne({ email: this.data.email });

        console.log("Found! based on email");
        console.log(attemptedUser);

        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
            this.data = attemptedUser;
            console.log("This data");
            console.log(this.data);

            return {user:attemptedUser, role: attemptedUser.role, _id: attemptedUser._id};
        } else {
            console.log("Invalid");

            return "Invalid username / password.";
        }
    } catch (error) {
        console.log("Failed");
        return "Failed";
    }
}

User.prototype.signUp = async function(){
   try {
       this.cleanUp()
       console.log("This data" + this.data);
       this.data.password =  await bcrypt.hash(this.data.password, 10)
      let data =  await usersCollection.insertOne(this.data)
      let user = await usersCollection.findOne({email: this.data.email})
       return {
              role: this.data.role,
              _id: data.insertedId,
              user: user
         
       };
   } catch (error) {
         console.log(error);
         return error;
   }


}

module.exports = User;
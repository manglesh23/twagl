const Class = require("../models/class");

/*--------------------------------------------------------------*/
/*----------------Controller to book class----------------------*/
/*--------------------------------------------------------------*/

const bookClass = async (req, res) => {
  const { userId, classId } = req.body;

  try {
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (classData.bookings.length < classData.capacity) {               //Check for Seat available
      classData.bookings.push({ userId });
      await classData.save();
      return res.status(200).json({ message: "Booking successful" });
    } else {                                                          //Else pass the data into waiting list
      classData.waitlist.push({ userId });
      await classData.save();
      return res.status(200).json({ message: "Added to waitlist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { bookClass };

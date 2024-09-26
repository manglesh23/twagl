const Class = require("../models/class");

/*-----------------------------------------------------------------------------------*/
/*-------------Controller to Cancel Booked class 30min before class satrt------------*/
/*-----------------------------------------------------------------------------------*/

const cancelBooking = async (req, res) => {
  const { userId, classId } = req.body;

  try {
    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const now = new Date();
    console.log("Cancel Booking time:-", now);
    const timeDifference = (classData.startTime - now) / (1000 * 60);
    console.log("Time diff:-", timeDifference);

    if (timeDifference <= 30) {
      return res.status(400).json({
        message: "Cannot cancel within 30 minutes of the class start time",
      });
    }

    const bookingIndex = classData.bookings.findIndex(
      (b) => b.userId.toString() === userId
    );
    if (bookingIndex > -1) {
      classData.bookings.splice(bookingIndex, 1);

      if (classData.waitlist.length > 0) {
        const nextUser = classData.waitlist.shift();            //Get the first user from the waiting list and Confirm it's seat
        classData.bookings.push({ userId: nextUser.userId });
      }

      await classData.save();
      return res.status(200).json({ message: "Booking canceled" });
    } else {
      return res.status(400).json({ message: "User not found in bookings" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { cancelBooking };

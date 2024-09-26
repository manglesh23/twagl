const Class = require("../models/class");

/*---------------------------------------------------------------------*/
/*----------------Get All Available Class from the database------------*/
/*---------------------------------------------------------------------*/

const getClasses = async (req, res) => {
  try {
    const { type, date, page = 1, limit = 10 } = req.query;

    let query = {};

    if (type) {
      query.name = type;
    }

    if (date) {
      const startDate = new Date(date);
      console.log(typeof startDate);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.startTime = { $gte: startDate, $lte: endDate};
    }
    console.log("Query:-", query);

    const skip = (page - 1) * limit;

    const classes = await Class.find(query);

    console.log("Classes:-", classes);

    const totalClasses = await Class.countDocuments(query);

    res.status(200).json({
      data: classes,
      pagination: {
        total: totalClasses,
        page: parseInt(page),
        pages: Math.ceil(totalClasses / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching classes" });
  }
};

module.exports = { getClasses };

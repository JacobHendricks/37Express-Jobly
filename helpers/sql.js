const { BadRequestError } = require("../expressError");


// The first variable, "dataToUpdate", accepts an object of the data to be updated in the database (typicaly this object is from the req.body).  It will give each entry in the object an index number for entering the SQL query.
// The second variable, "jsToSql", will change the name of the object key from the JS name to the SQL name.

// Example:
// {"description": "Good Company", "numEmployees": "5"} => {setCols: '"description"=$1, "num_employees"=$2', values: [ 'Good Company', '5' ]}


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
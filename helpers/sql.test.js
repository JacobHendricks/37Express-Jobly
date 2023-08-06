const { sqlForPartialUpdate } = require("./sql")
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function () {
  test("works", function () {
    const sql = sqlForPartialUpdate({"description": "Good Company", "numEmployees": "5"}, {numEmployees: "num_employees", logoUrl: "logo_url" })
    expect(sql).toEqual({
      setCols: '"description"=$1, "num_employees"=$2',
      values: [ 'Good Company', '5' ]
    });
  });

})
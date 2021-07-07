# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

> SELECT ProductName, CategoryName FROM [Products] p
> JOIN Categories as c on p.CategoryID = c.CategoryID

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

> SELECT OrderID, ShipperName FROM [Orders] o
> LEFT JOIN [Shippers] s on o.shipperid = s.shipperid
> WHERE o.orderdate < "1997-01-09"

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

> SELECT ProductName, Quantity FROM [Products] p
> JOIN [orderdetails] o on p.productid = o.productid
> WHERE orderid = 10251

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

> SELECT
> OrderID,
> CustomerName,
> lastName as Employee_LastName
> FROM [Orders] o
> JOIN [Employees] e on e.employeeid = o.employeeid
> JOIN [Customers] c on c.customerid = o.customerid;

### (Stretch) Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

> SELECT
> CategoryName, count(p.categoryid) as Count
> FROM [Products] p
> JOIN [Categories] c on p.categoryid = c.categoryid
> GROUP BY c.categoryid

### (Stretch) Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

> SELECT OrderID, count(ProductID) as ItemCount
> FROM [OrderDetails]
> GROUP BY OrderID

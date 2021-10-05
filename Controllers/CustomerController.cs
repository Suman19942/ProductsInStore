using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductsInStore.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductsInStore.Controllers
{
    [Route("Customer")]
    public class CustomerController : Controller
    {
        private readonly ProductInStoreDBContext _dbContext;


        public CustomerController(ProductInStoreDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: /<controller>/
        //[HttpGet]
        //[Route("GetCustomerList")]
        //public List<Customer> Index()
        //{
        //    return _dbContext.Customers.ToList();
        //}

        [Route("GetCustomers")]
        [HttpGet]
        public object Customerdetails()
        {

            var a = _dbContext.Customers.ToList();
            return a;
        }

        [Route("CustomerdetailById")]
        [HttpGet]
        public object CustomerdetailById(int id)
        {
            var obj = _dbContext.Customers.Where(x => x.Id == id).ToList().FirstOrDefault();
            return obj;
        }

        [HttpPost]
        [Route("AddCustomer")]
        public IActionResult AddCustomer([FromBody] Customer customer)
        {
            //if (customer.Id == 0)
            //{
            //    _dbContext.Add(customer);
            //    _dbContext.SaveChanges();
            //    return Ok(new { code = 200, msg = "updated successfully" });
            //}
            //else
            //{
            //    var cust = _dbContext.Customers.Find(customer.Id);
            //    cust.Id = customer.Id;
            //    cust.Name = customer.Name;
            //    cust.Address = customer.Address;

            //    _dbContext.Entry(cust).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            //    return Ok(new { code = 200, msg = "updated successfully" });

            //}
            try
            {
                if (customer.Id == 0)
                {
                    Customer customers = new Customer();
                    customers.Name = customer.Name;
                    customers.Address = customer.Address;
                    _dbContext.Add(customer);
                    _dbContext.SaveChanges();
                    return Ok(new
                    {
                        Status = "Success",
                        Message = "Data Successfully"
                    });
                }
          
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            return Ok(new
            {
                Status = "Error",
                Message = "Data not insert"
            });

        }

        [HttpPut("{Id}")]
        [Route("UpdateCustomer")]
        public IActionResult UpdateCustomer(long Id , [FromBody] Customer customer)
        {


            //cust.Id = customer.Id;
            //cust.Name = customer.Name;
            //cust.Address = customer.Address;

            //_dbContext.Entry(cust).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            //return Ok(new { code = 200, msg = "updated successfully" });


            try
            {

                var cust = _dbContext.Customers.Find(Id);
                if (cust != null)
                {
                    cust.Name = customer.Name;
                    cust.Address = customer.Address;
                    _dbContext.SaveChanges();
                    return Ok(new
                    {
                        Status = "Updated",
                        Message = "Updated Successfully"
                    });
                }
                

            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            return Ok(new
            {
                Status = "Error",
                Message = "Data not insert"
            });

        }

        [HttpDelete("{customerID}")]
        [Route("DeleteCustomer")]
        public IActionResult DeleteCustomer([FromQuery] long customerID)
        {
            Customer customer = _dbContext.Customers.Find(customerID);
            if (customer != null)
            {
                _dbContext.Remove(customer);
                _dbContext.SaveChanges();
                return Ok(new { code = 200, msg = "Deleted successfully" });

            }
            else
                return Ok(new { code = 200, msg = "Already Deleted" });
        }
    }
}

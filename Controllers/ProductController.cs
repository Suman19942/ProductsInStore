using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;
using ProductsInStore.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductsInStore.Controllers
{
    [Route("Product")]
    public class ProductController : Controller
    {
        private readonly ProductInStoreDBContext _dbContext;

        
        public ProductController(ProductInStoreDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: /<controller>/
        [HttpGet]
        [Route("GetProductList")]
        public List<Product> Index()
        {
            return _dbContext.Products.ToList();
        }


        [HttpPost]
        [Route("AddProduct")]
        public IActionResult AddProduct([FromBody] Product product)
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
                if (product.Id == 0)
                {
                    Product products = new Product();
                    products.Name = product.Name;
                    products.Price = product.Price;
                    _dbContext.Add(product);
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
        [Route("UpdateProduct")]
        public IActionResult UpdateProduct(long Id, [FromBody] Product product)
        {


            //cust.Id = customer.Id;
            //cust.Name = customer.Name;
            //cust.Address = customer.Address;

            //_dbContext.Entry(cust).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            //return Ok(new { code = 200, msg = "updated successfully" });


            try
            {

                var prod = _dbContext.Products.Find(Id);
                if (prod != null)
                {
                    prod.Name = product.Name;
                    prod.Price = product.Price;
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
        [HttpDelete]
        [Route("DeleteProduct")]
        public IActionResult DeleteProduct([FromQuery] long productID)
        {
            Product product = _dbContext.Products.Find(productID);
            if (product != null)
            {
                _dbContext.Remove(product);
                _dbContext.SaveChanges();
                return Ok(new { code = 200, msg = "Deleted successfully" });

            }
            else
                return Ok(new { code = 200, msg = "Already Deleted" });
        }
    }
}

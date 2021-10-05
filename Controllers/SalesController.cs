using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsInStore.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductsInStore.Controllers
{
    [Route("Sales")]
    public class SalesController : Controller
    {
        private readonly ProductInStoreDBContext _dbContext;


        public SalesController(ProductInStoreDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: /<controller>/
        
        [Route("GetSalesList")]
        [HttpGet]
        public List<Sales> Index()
        {
            return _dbContext.Sales.OrderBy(s => true).Include(s => s.CustomerNavigation).Include(s => s.ProductNavigation).Include(s => s.StoreNavigation).ToList();
        }


        [HttpPost]
        [Route("AddSales")]
        public IActionResult AddSales([FromBody] Sales sales)
        {
            try
            {
                if (sales.Id == 0)
                {
                    Sales sales1 = new Sales();
                    //Sales sales1 = new Sales
                    //{
                       // CustomerId = sales.CustomerId
                    //}
                    //sales1.CustomerId = sales.CustomerId;
                    sales1.ProductId = sales.ProductId;
                    sales1.StoreId = sales.StoreId;
                    sales1.DateSold = sales.DateSold;
                    _dbContext.Add(sales);
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


        [HttpPut]
        [Route("UpdateSales")]
        public IActionResult UpdateSales(long id, [FromBody] Sales sales)
        {
            try
            {
                var sale1 = _dbContext.Sales.Find(id);
                if (sale1 != null)
                {
                  
                    sale1.CustomerId = sales.CustomerId;
                    sale1.ProductId = sales.ProductId;
                    sale1.StoreId = sales.StoreId;
                    sale1.DateSold = sales.DateSold;
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
        [Route("DeleteSales")]
        public IActionResult DeleteSales([FromQuery] long salesID)
        {
            Sales sales = _dbContext.Sales.Find(salesID);
            if (sales != null)
            {
                _dbContext.Remove(sales);
                _dbContext.SaveChanges();
                return Ok(new { code = 200, msg = "Deleted successfully" });

            }
            else
                return Ok(new { code = 200, msg = "Already Deleted" });
        }
    }
}

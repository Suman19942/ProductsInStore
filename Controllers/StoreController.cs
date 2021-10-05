using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductsInStore.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductsInStore.Controllers
{
    [Route("Store")]
    public class StoreController : Controller
    {
        private readonly ProductInStoreDBContext _dbContext;


        public StoreController(ProductInStoreDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: /<controller>/
        [HttpGet]
        [Route("GetStoreList")]
        public List<Store> Index()
        {
            return _dbContext.Stores.ToList();
        }



        [HttpPost]
        [Route("AddStore")]
        public IActionResult AddStore([FromBody] Store store)
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
                if (store.Id == 0)
                {
                    Store stores = new Store();
                    stores.Name = store.Name;
                    stores.Address = store.Address;
                    _dbContext.Add(store);
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
        [Route("UpdateStore")]
        public IActionResult UpdateCustomer(long Id, [FromBody] Store store)
        {


            //cust.Id = customer.Id;
            //cust.Name = customer.Name;
            //cust.Address = customer.Address;

            //_dbContext.Entry(cust).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            //return Ok(new { code = 200, msg = "updated successfully" });


            try
            {

                var st = _dbContext.Stores.Find(Id);
                if (st != null)
                {
                    st.Name = store.Name;
                    st.Address = store.Address;
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
        [Route("DeleteStore")]
        public IActionResult DeleteStore([FromQuery] long storeID)
        {
            Store store = _dbContext.Stores.Find(storeID);
            if (store != null)
            {
                _dbContext.Remove(store);
                _dbContext.SaveChanges();
                return Ok(new { code = 200, msg = "Deleted successfully" });

            }
            else
                return Ok(new { code = 200, msg = "Already Deleted" });
        }
    }
}

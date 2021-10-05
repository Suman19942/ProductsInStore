using System;
using Microsoft.EntityFrameworkCore;

namespace ProductsInStore.Models
{
    public class ProductInStoreDBContext : DbContext
    {
        public ProductInStoreDBContext(DbContextOptions<ProductInStoreDBContext> options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<Store> Stores { get; set; }
    }
}

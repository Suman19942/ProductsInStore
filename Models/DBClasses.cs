using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsInStore.Models
{
    public class Customer
    {
        [Column("CustomerId")]
        public long Id { get; set; }

        [Column("CustomerName")]
        [Required(ErrorMessage = "Enter Customer Name")]
        [MaxLength(50, ErrorMessage = "Customer Name cannot exceed 50 characters")]
        public string Name { get; set; }

        [Column("CustomerAddress")]
        [Required(ErrorMessage = "Please enter Customer's Address")]
        [MaxLength(50, ErrorMessage = "Only 50 character are allowed")]
        public string Address { get; set; }
        //Navigations
        public List<Sales> SalesNavigation { get; set; }

    }

    public class Product
    {
        [Column("ProductId")]
        public long Id { get; set; }

        [Column("ProductName")]
        [Required(ErrorMessage = "Enter Product Name")]
        [MaxLength(50, ErrorMessage = "Product Name cannot exceed 50 characters")]
        public string Name { get; set; }

        [Column("ProductPrice")]
        [Required]
        public decimal Price { get; set; }

        public List<Sales> SalesNavigation { get; set; }
    }

    public class Store
    {
        [Column("StoreId")]
        public long Id { get; set; }

        [Column("StoreName")]
        [Required]
        [MaxLength(50, ErrorMessage = "Store Name cannot exceed 50 characters")]
        public string Name { get; set; }

        [Column("StoreAddress")]
        [Required]
        [MaxLength(50, ErrorMessage = "Product Name cannot exceed 50 characters")]
        public string Address { get; set; }

        public List<Sales> SalesNavigation { get; set; }
    }

    public class Sales
    {
        [Column("SalesId")]
        public long Id { get; set; }


        public long CustomerId { get; set; }

        public long ProductId { get; set; }

        public long StoreId { get; set; }

        [Column("ProductSoldDate")]
        [Required]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime DateSold { get; set; }


        public Customer CustomerNavigation { get; set; }
        public Product ProductNavigation { get; set; }
        public Store StoreNavigation { get; set; }
    }
}

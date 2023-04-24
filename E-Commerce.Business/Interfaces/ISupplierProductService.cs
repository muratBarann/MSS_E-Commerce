﻿using E_Commerce.Dtos.ProductImageDtos;
using E_Commerce.Dtos.ProductsInStockDtos;
using E_Commerce.Dtos.SupplierDtos;
using E_Commerce.Dtos.SupplierProductDtos;
using E_Commerce.Entities.EFCore;
using E_Commerce.Entities.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.Business.Interfaces
{
    public interface ISupplierProductService : IService<SupplierProductCreateDto , SupplierProductListDto , SupplierProductUpdateDto , SupplierProduct>
    {
        Task<List<ProductInStockListDto>> GetAllWithRequestParameter(SupplierProductRequestParameter parameter);
        Task<List<ProductInStockListDto>> GetAllProductInStockAsync(int supplierid);
        Task<CustomProductInStockListDto> GetCustomSupplierProductAsync(int supplierProductId);
        Task<int> CreateSupplierProduct(SupplierProductCreateDto dto);
        Task AddImageUrls(List<ProductImageCreateDto> dtos);
        Task AddProductToStock(int supplierProductId, int amount , double unitprice);
    }
}

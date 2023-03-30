﻿using E_Commerce.Entities.EFCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.Entities.EFCore
{
    public abstract class BaseEntity : IBaseEntity
    {
        public int Id { get; set; }

        public bool IsActive { get; set; }
    }
}

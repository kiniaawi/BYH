using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace byh_api.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int IsActive { get; set; }
        public int IsDeleted { get; set; }
        public string CreatedAt { get; set; }
        public string DeletedAt { get; set; }
        public int IsAdmin { get; set; }

    }
}

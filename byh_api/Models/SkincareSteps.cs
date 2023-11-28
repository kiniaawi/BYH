using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace byh_api.Models
{
    public class SkincareSteps
    {
        public int Id { get; set; }
        public int StepId { get; set; }
        public string Step { get; set; }
        public string SkinType { get; set; }
        public string DayTime { get; set; }
        public int isDeleted { get; set; }
    }
}

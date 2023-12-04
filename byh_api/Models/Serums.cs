﻿namespace byh_api.Models
{
    public class Serums
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string SkinType { get; set; }
        public string SkinIssue { get; set; }
        public string Application { get; set; }
        public string DayTime { get; set; }
        public string Frequency { get; set; }
        public int minAge { get; set; }
        public string ImageURL { get; set; }
        public string forPregnant { get; set; }
        public int isDeleted { get; set; }
    }
}

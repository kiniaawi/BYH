namespace byh_api.Models
{
    public class Essences
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string SkinType { get; set; }
        public string SkinIssue { get; set; }
        public string DayTime { get; set; }
        public string Frequency { get; set; }
        public int minAge { get; set; }
        public int isPregnant { get; set; }
        public int isDeleted { get; set; }
    }
}

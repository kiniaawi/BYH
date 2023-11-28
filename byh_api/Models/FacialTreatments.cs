namespace byh_api.Models
{
    public class FacialTreatments
    {
        public int Id { get; set; }
        public string Treatment { get; set; }
        public string SkinType { get; set; }
        public string SkinIssue { get; set; }
        public string Frequency { get; set; }
        public int minAge { get; set; }
        public int isPregnant { get; set; }
        public int isDeleted { get; set; }
    }
}

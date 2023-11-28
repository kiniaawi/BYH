using byh_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace byh_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EssencesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EssencesController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            Response response = new Response();

            try
            {
                string query = @"SELECT * from dbo.Essences";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Data Fetched Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Fetching Data Failed";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [HttpPost]
        public JsonResult Post(Essences essences)
        {
            Response response = new Response();

            try
            {
                string query = @"INSERT INTO dbo.Essences VALUES(@ProductName, @ProductType, @SkinIssue, @DayTime,
                                @Frequency, @minAge, @isPregnant, 0)";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@ProductName", essences.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductType", essences.ProductType);
                        myCommand.Parameters.AddWithValue("@SkinIssue", essences.SkinIssue);
                        myCommand.Parameters.AddWithValue("@DayTime", essences.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", essences.Frequency);
                        myCommand.Parameters.AddWithValue("@minAge", essences.minAge);
                        myCommand.Parameters.AddWithValue("@isPregnant", essences.isPregnant);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Data Inserted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Inserting Data Failed";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [HttpPut("UpdateToner/{Id}")]
        public JsonResult UpdateToner(Essences essences, int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.Essences SET ProductName = @ProductName, ProductType = @ProductType, SkinIssue = @SkinIssue,
                            DayTime = @DayTime, Frequency = @Frequency, minAge = @minAge, isPregnant = @isPregnant
                            WHERE Id = @Id";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@Id", essences.Id);
                        myCommand.Parameters.AddWithValue("@ProductName", essences.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductType", essences.ProductType);
                        myCommand.Parameters.AddWithValue("@SkinIssue", essences.SkinIssue);
                        myCommand.Parameters.AddWithValue("@DayTime", essences.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", essences.Frequency);
                        myCommand.Parameters.AddWithValue("@minAge", essences.minAge);
                        myCommand.Parameters.AddWithValue("@isPregnant", essences.isPregnant);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Data Updated Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Updating Data Failed";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [HttpPut("DelEssence/{Id}")]
        public JsonResult DelEssence(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.Essences SET IsDeleted = 1
                            WHERE Id = @Id AND IsDeleted = 0";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@Id", Id);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Essence Deleted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Delete Essence";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [HttpPut("RevEssence/{Id}")]
        public JsonResult RevEssence(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.Essences SET IsDeleted = 1
                            WHERE Id = @Id AND IsDeleted = 0";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@Id", Id);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Essence Reverted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Revert Essence";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            Response response = new Response();

            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];

                if (postedFile != null && postedFile.Length > 0)
                {
                    string filename = Path.GetFileName(postedFile.FileName);
                    var physicalPath = Path.Combine(_env.ContentRootPath, "Photos/Essences", filename);

                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        postedFile.CopyTo(stream);
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Photo Saved Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    return new JsonResult(filename);
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No file provided.";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    return new JsonResult(response);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Save Photo";
                HttpContext.Response.StatusCode = 500;
                return new JsonResult(response);
            }
        }
    }
}

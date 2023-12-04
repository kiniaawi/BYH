using byh_api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace byh_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OilCleanersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public OilCleanersController(IConfiguration configuration, IWebHostEnvironment env)
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
                string query = @"SELECT * from dbo.OilCleaners";

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

        [Route("InsertingData")]
        [HttpPost]
        public JsonResult InsertingData(OilCleaners oilCleaners)
        {
            Response response = new Response();

            try
            {
                string query = @"INSERT INTO dbo.OilCleaners VALUES(@ProductName, @ProductType, @SkinType, @SkinIssue, @DayTime,
                                @Frequency, @MinAge, @ImageURL, @ForPregnant, 0)";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader; 
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@ProductName", oilCleaners.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductType", oilCleaners.ProductType);
                        myCommand.Parameters.AddWithValue("@SkinType", oilCleaners.SkinType);
                        myCommand.Parameters.AddWithValue("@SkinIssue", oilCleaners.SkinIssue);
                        myCommand.Parameters.AddWithValue("@DayTime", oilCleaners.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", oilCleaners.Frequency);
                        myCommand.Parameters.AddWithValue("@MinAge", oilCleaners.MinAge);
                        myCommand.Parameters.AddWithValue("@ImageURL", oilCleaners.ImageURL);
                        myCommand.Parameters.AddWithValue("@ForPregnant", oilCleaners.ForPregnant);
                        myReader = myCommand.ExecuteReader();
                        while (myReader.Read())
                        {
                            ReadSingleRow((IDataRecord)myReader);
                            table.Load(myReader);
                        }
                        
                        myReader.Close();
                        myConn.Close();
                        //myReader.Close();
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

        private static void ReadSingleRow(IDataRecord dataRecord)
        {
            Console.WriteLine(String.Format("{0}, {1}", dataRecord[0], dataRecord[1]));
        }

        [HttpPut("UpdateOilCl/{Id}")]
        public JsonResult UpdateOilCl(OilCleaners oilCleaners, int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.OilCleaners SET ProductName = @ProductName, ProductType = @ProductType, SkinType = @SkinType,
                            SkinIssue = @SkinIssue, DayTime = @DayTime, Frequency = @Frequency, MinAge = @MinAge, ImageURL = @ImageURL, ForPregnant = @ForPregnant
                            WHERE Id = @Id";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@Id", oilCleaners.Id);
                        myCommand.Parameters.AddWithValue("@ProductName", oilCleaners.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductType", oilCleaners.ProductType);
                        myCommand.Parameters.AddWithValue("@SkinType", oilCleaners.SkinType);
                        myCommand.Parameters.AddWithValue("@SkinIssue", oilCleaners.SkinIssue);
                        myCommand.Parameters.AddWithValue("@DayTime", oilCleaners.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", oilCleaners.Frequency);
                        myCommand.Parameters.AddWithValue("@minAge", oilCleaners.MinAge);
                        myCommand.Parameters.AddWithValue("@ImageURL", oilCleaners.ImageURL);
                        myCommand.Parameters.AddWithValue("@forPregnant", oilCleaners.ForPregnant);
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

        [HttpPut("DelOilCl/{Id}")]
        public JsonResult DelOilCl(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.OilCleaners SET IsDeleted = 1
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
                    response.StatusMessage = "Oil Cleaner Deleted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Delete Oil Cleaner";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [HttpPut("RevOilCl/{Id}")]
        public JsonResult RevOilCl(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.OilCleaners SET IsDeleted = 1
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
                    response.StatusMessage = "Oil Cleaner Reverted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Revert Oil Cleaner";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [Route("SaveFileOils")]
        [HttpPost]
        public JsonResult SaveFileOils()
        {
            Response response = new Response();

            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];

                if (postedFile != null && postedFile.Length > 0)
                {
                    string filename = Path.GetFileName(postedFile.FileName);
                    var physicalPath = Path.Combine(_env.ContentRootPath, "Photos/OilCleaners", filename);

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

﻿using byh_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using System;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Threading.Tasks;

namespace byh_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoisturizersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public MoisturizersController(IConfiguration configuration, IWebHostEnvironment env)
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
                string query = @"SELECT * from dbo.Moisturizers";

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
        public JsonResult Post(Moisturizers moisturizers)
        {
            Response response = new Response();

            try
            {
                string query = @"INSERT INTO dbo.Moisturizers VALUES(@ProductName, @ProductType, @SkinIssue, @DayTime,
                                @Frequency, @minAge, @ImageURL, @forPregnant, 0)";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@ProductName", moisturizers.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductType", moisturizers.ProductType);
                        myCommand.Parameters.AddWithValue("@SkinIssue", moisturizers.SkinIssue);
                        myCommand.Parameters.AddWithValue("@DayTime", moisturizers.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", moisturizers.Frequency);
                        myCommand.Parameters.AddWithValue("@minAge", moisturizers.minAge);
                        myCommand.Parameters.AddWithValue("@ImageURL", moisturizers.ImageURL);
                        myCommand.Parameters.AddWithValue("@forPregnant", moisturizers.forPregnant);
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

        [HttpPut("UpdateMoisturizer/{Id}")]
        public JsonResult UpdateMoisturizer(Moisturizers moisturizers, int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.Moisturizers SET ProductName = @ProductName, ProductType = @ProductType, SkinIssue = @SkinIssue,
                            DayTime = @DayTime, Frequency = @Frequency, minAge = @minAge, ImageURL = @ImageURL, forPregnant = @forPregnant
                            WHERE Id = @Id";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@Id", moisturizers.Id);
                        myCommand.Parameters.AddWithValue("@ProductName", moisturizers.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductType", moisturizers.ProductType);
                        myCommand.Parameters.AddWithValue("@SkinIssue", moisturizers.SkinIssue);
                        myCommand.Parameters.AddWithValue("@DayTime", moisturizers.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", moisturizers.Frequency);
                        myCommand.Parameters.AddWithValue("@minAge", moisturizers.minAge);
                        myCommand.Parameters.AddWithValue("@ImageURL", moisturizers.ImageURL);
                        myCommand.Parameters.AddWithValue("@forPregnant", moisturizers.forPregnant);
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

        [HttpPut("DelMoisturizer/{Id}")]
        public JsonResult DelMoisturizer(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.Moisturizers SET isDeleted = 1
                            WHERE Id = @Id AND isDeleted = 0";

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
                    response.StatusMessage = "Moisturizer Deleted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Delete Moisturizer";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [HttpPut("RevMoisturizer/{Id}")]
        public JsonResult RevMoisturizer(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.Moisturizers SET isDeleted = 1
                            WHERE Id = @Id AND isDeleted = 0";

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
                    response.StatusMessage = "Moisturizer Reverted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Revert Moisturizer";
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
                    var physicalPath = Path.Combine(_env.ContentRootPath, "Photos/Moisturizers", filename);

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

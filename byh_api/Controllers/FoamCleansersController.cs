﻿using byh_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using System;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace byh_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoamCleansersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public FoamCleansersController(IConfiguration configuration, IWebHostEnvironment env)
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
                string query = @"SELECT * from dbo.FoamCleansers";

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
        public JsonResult Post(FoamCleansers foamCleansers)
        {
            Response response = new Response();

            try
            {
                string query = @"INSERT INTO dbo.FoamCleansers VALUES(@ProductName, @ProductTypeId, 
                                (SELECT Solution FROM dbo.DealingSkinIssues WHERE Id = @ProductTypeId), @SkinType, @DayTime,
                                @Frequency, @MinAge, @ImageURL, @ForPregnant, 0)";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@ProductName", foamCleansers.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductTypeId", foamCleansers.ProductTypeId);
                        myCommand.Parameters.AddWithValue("@SkinType", foamCleansers.SkinType);
                        myCommand.Parameters.AddWithValue("@DayTime", foamCleansers.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", foamCleansers.Frequency);
                        myCommand.Parameters.AddWithValue("@MinAge", foamCleansers.MinAge);
                        myCommand.Parameters.AddWithValue("@ImageURL", foamCleansers.ImageURL);
                        myCommand.Parameters.AddWithValue("@ForPregnant", foamCleansers.ForPregnant);
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

        [HttpPut("UpdateFoamCl/{Id}")]
        public JsonResult UpdateFoamCl(FoamCleansers foamCleansers, int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.FoamCleansers SET ProductName = @ProductName, ProductTypeId = @ProductTypeId, 
                            ProductType = (SELECT Solution FROM dbo.DealingSkinIssues WHERE Id = @ProductTypeId), 
                            SkinType = @SkinType, DayTime = @DayTime, Frequency = @Frequency, MinAge = @MinAge, ImageURL = @ImageURL,
                            ForPregnant = @ForPregnant
                            WHERE Id = @Id";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@Id", foamCleansers.Id);
                        myCommand.Parameters.AddWithValue("@ProductName", foamCleansers.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductTypeId", foamCleansers.ProductTypeId);
                        myCommand.Parameters.AddWithValue("@SkinType", foamCleansers.SkinType);
                        myCommand.Parameters.AddWithValue("@DayTime", foamCleansers.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", foamCleansers.Frequency);
                        myCommand.Parameters.AddWithValue("@MinAge", foamCleansers.MinAge);
                        myCommand.Parameters.AddWithValue("@ImageURL", foamCleansers.ImageURL);
                        myCommand.Parameters.AddWithValue("@ForPregnant", foamCleansers.ForPregnant);
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

        [HttpPut("DelFoamCl/{Id}")]
        public JsonResult DelFoamCl(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.FoamCleansers SET IsDeleted = 1
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
                    response.StatusMessage = "Foam Cleanser Deleted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Delete Foam Cleanser";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }

        [HttpPut("RevFoamCl/{Id}")]
        public JsonResult RevFoamCl(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.FoamCleansers SET IsDeleted = 0
                            WHERE Id = @Id AND IsDeleted = 1";

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
                    response.StatusMessage = "Foam Cleanser Reverted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Revert Foam Cleanser";
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
                    var physicalPath = Path.Combine(_env.ContentRootPath, "Photos/FoamCleansers", filename);

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

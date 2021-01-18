using System;
using Microsoft.AspNetCore.Mvc;

namespace newsgen_backend.Controllers
{
    /*
        <summary>
            API controller for verifying that the backend is working.
        </summary>
    */
    [ApiController]
    [Route("/")]
    public class WeatherForecastControllerCopy : ControllerBase {

        /*
            <summary>
                Verifies that the backend is working.
            </summary>
            <returns>
                Message.
            </returns>
        */
        [HttpGet]
        public String printMessage()
        {
            return "Backend API for Newsgen is working!";
        }
    }
}

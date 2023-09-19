import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FlightDetailsProps } from "../types";

const FlightResults = ({ flightDetails }: FlightDetailsProps) => {
  return (
    <div>
      {flightDetails ? (
        <Accordion
          sx={{ backgroundColor: "black" }}
          key={flightDetails.FLSDepartureCode}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="bg-zinc-900 grid grid-cols-6 text-white p-10 hover:shadow-primary shadow-md  rounded-2xl gap-5 transition transform duration-500 hover:-translate-y-1 hover:scale-100">
                <div>
                  <h2>{flightDetails.FLSDepartureName}</h2>
                  <h2>{flightDetails.FLSDepartureCode}</h2>
                </div>
                <div className="flex flex-col">
                  <p>Departure Time</p>
                  {flightDetails.FLSDepartureDateTime.split("T")[1]}
                  <p className="text-sm">Local Time</p>
                </div>
              <div className="flex flex-col">
                <p>Total Flight Time </p>
                <span>
                  {"\n" +
                    flightDetails.TotalFlightTime.split("T")[1]
                      .slice(0, 2)
                      .toLocaleLowerCase() +
                    "\t" +
                    flightDetails.TotalFlightTime.split("T")[1]
                      .slice(2, flightDetails.TotalFlightTime.length)
                      .toLocaleLowerCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <p>Total Journey Duration </p>
                <span>
                  {"\n" +
                    flightDetails.TotalTripTime.split("T")[1]
                      .slice(0, 2)
                      .toLocaleLowerCase() +
                    "\t" +
                    flightDetails.TotalTripTime.split("T")[1]
                      .slice(2, flightDetails.TotalTripTime.length)
                      .toLocaleLowerCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <p>Arrival Time</p>
                {flightDetails.FLSArrivalDateTime.split("T")[1]}
                <p className="text-sm">Local Time</p>
              </div>
              <div>
                <h2>{flightDetails.FLSArrivalName}</h2>
                <h2>{flightDetails.FLSArrivalCode}</h2>
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="flex flex-col gap-5 bg-zinc-950 rounded-2xl border border-zinc-700">
              {flightDetails.FlightLegDetails.map((leg, key) => {
                return (
                  <div className="flex flex-col gap-5 text-white justify-start items-start border-b border-zinc-700  p-10  ">
                    Leg {key + 1}
                    <div
                      className="flex justify-start items-start  gap-5"
                      key={key}
                    >
                      <div>
                        <p>{leg.MarketingAirline.CompanyShortName}</p>
                        {leg.FlightNumber}
                      </div>
                      <div className="flex gap-5">
                        <div className="flex flex-col">
                          {leg.DepartureAirport.FLSLocationName}
                          <span>{leg.DepartureAirport.LocationCode}</span>
                        </div>
                        <div>
                          <p>Departure</p>
                          {leg.DepartureDateTime.split("T")[1]}
                        </div>
                      </div>
                      <div>
                        <p>Arrival Time</p>
                        <span>{leg.ArrivalDateTime.split("T")[1]}</span>
                      </div>
                      <div className="flex flex-col">
                        {leg.ArrivalAirport.FLSLocationName}
                        <span>{leg.ArrivalAirport.LocationCode}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FlightResults;

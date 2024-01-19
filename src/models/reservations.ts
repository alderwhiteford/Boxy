import { PrismaClient, listings, reservations, user } from "@prisma/client";
import listingDataTable from "lib/listingInstance";
import persistentUserInstance from "lib/userInstance";
import userInstance from "lib/userInstance";
import { Session, User } from "next-auth";

export type ViewResponse = {
  "my reservation requests"?: any[];
  "my accepted reservations"?: number[];
  "my approved reservations"?: number[];
  "my reservations"?: ReservationResponse[];
};

export type ReservationResponse = {
  reservation_id: number;
  listing_id: number;
  requested_on?: Date;
  dates_requested?: Date[];
  name?: String;
  host_name?: String;
  address?: String;
  stasher_name?: String;
};

export default class Reservations {
  constructor(private readonly reservationsDB: PrismaClient["reservations"]) {}

  async create(data: any, session: Session) {
    try {
      const listing = await listingDataTable.getListing(data.listing_id);
      const userSignedIn = await userInstance.getUser(session.user?.email);

      data.stasher_id = userSignedIn.user_id;
      data.host_id = listing.host_id;

      // setting required attributes
      this.setDefaultAttributes(data);

      // input validation
      await this.validateInputData(data);

      // add entry to database
      await this.reservationsDB.create({ data });
    } catch (e) {
      throw e;
    }
  }

  async deleteReservationsBelongToListing(listing_id: any) {
    await this.reservationsDB.deleteMany({
      where: {
        listing_id: parseInt(listing_id),
      },
    });
  }

  async updateReservation(data: any) {
    try {
      this.validateInputData(data);

      await this.reservationsDB.update({
        where: {
          reservation_id: data["reservation_id"],
        },
        data: data,
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteReservation(id: number) {
    try {
      await this.reservationsDB.delete({
        where: {
          reservation_id: id,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async getReservation(id: number) {
    try {
      const res = await this.reservationsDB.findUnique({
        where: {
          reservation_id: id,
        },
      });

      // If response doesn't exists
      if (!res) {
        throw new Error("Reservation doesn't exists");
      }

      let response: ReservationResponse = {
        reservation_id: res["reservation_id"],
        listing_id: res["listing_id"],
      };

      return response;
    } catch (e) {
      throw e;
    }
  }

  async getHostReservations(userID: any) {
    try {
      const reservationResponse = await this.reservationsDB.findMany({
        where: {
          host_id: userID,
          cancelled: false,
        },
      });

      let reservation_list = [];

      for (const reservation of reservationResponse) {
        let curListing = await listingDataTable.getListing(
          reservation.listing_id
        );
        let user = await userInstance.getUserGivenId(reservation.stasher_id);

        let curDetails: ReservationResponse = {
          reservation_id: reservation.reservation_id,
          listing_id: curListing.listing_id,
          dates_requested: reservation.dates_requested,
          name: curListing.name,
          address: curListing.address,
          stasher_name: user?.name,
        };
        reservation_list.push(curDetails);
      }

      let response = {
        "my reservations": reservation_list,
      };

      return response;
    } catch (e) {
      throw e;
    }
  }

  async getStasherReservations(userID: any) {
    try {
      const reservationResponse = await this.reservationsDB.findMany({
        where: {
          stasher_id: userID,
        },
      });
      const reservation_list: Array<ReservationResponse> = new Array();

      for (const reservation of reservationResponse) {
        let curListing: listings = await listingDataTable.getListing(
          reservation.listing_id
        );

        let user = await userInstance.getUserGivenId(curListing.host_id);

        let curDetails: ReservationResponse = {
          reservation_id: reservation.reservation_id,
          listing_id: curListing.listing_id,
          dates_requested: reservation.dates_requested,
          name: curListing.name,
          address: curListing.address,
          host_name: user?.name,
        };
        reservation_list.push(curDetails);
      }

      let response = {
        "my reservations": reservation_list,
      };

      console.log(response);

      return response;
    } catch (e) {
      throw e;
    }
  }

  async cancelReservation(id: number, now: Date) {
    try {
      await this.reservationsDB.update({
        where: {
          reservation_id: id,
        },
        data: {
          cancelled: true,
          cancelled_on: now,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  private setDefaultAttributes(data: any) {
    // data["accepted"] = false;
    // data["requested_on"] = new Date();
    // data["host_id"] = 1;
    // data["cancelled"] = false;
    // data.dates_requested = data.dates_requested.map(
    //   (date: string | number | Date) => new Date(date)
    // );
  }

  private async validateInputData(data: any) {
    //   const response = await this.reservationsDB.getReservation(data) {
    //     (
    //     data.listing_id
    //   );
    //   const dates_available = response?.dates_available;
    //   if (
    //     dates_available === undefined ||
    //     !data.dates_requested.every((date: Date) => {
    //       dates_available.includes(new Date(date));
    //     })
    //   ) {
    //     throw new Error("Listing is not available during requested dates");
    //   }
    // }
    return true;
  }
}

import ListingsDataTable from "@/models/listings";
import prisma from "lib/db";

const listingDataTable = new ListingsDataTable(prisma.listings);

export default listingDataTable;

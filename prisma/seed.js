import { PrismaClient } from "@prisma/client";
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  const { amenities } = amenitiesData;
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: {
        ...host,
      },
    });
  }

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: {
        id: amenity.id,
        name: amenity.name,
      },
    });
  }

  for (const property of properties) {
    const { hostId, amenitiesIds = [], ...rest } = property;

    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        ...rest,

        pricePerNight: parseFloat(property.pricePerNight),
        host: {
          connect: {
            id: hostId,
          },
        },
        amenities: {
          connect: amenitiesIds.map((id) => ({ id })),
        },
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        ...review,
      },
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        ...user,
      },
    });
  }
  for (const booking of bookings) {
    const { userId, propertyId, ...rest } = booking;

    const createData = {
      ...rest,
      checkinDate: new Date(booking.checkinDate).toISOString(),
      checkoutDate: new Date(booking.checkoutDate).toISOString(),
      totalPrice: parseFloat(booking.totalPrice),
      property: {
        connect: {
          id: propertyId,
        },
      },
    };

    if (userId) {
      createData.user = {
        connect: {
          id: userId,
        },
      };
    }

    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: createData,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

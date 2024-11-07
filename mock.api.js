const cors = require("cors");
const faker = require("faker");
const express = require("express");
const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "10mb" }));

app.post("/pepo-control/signin", async (req, res) => {
    await delay(2000);

    res.json({
        id: faker.random.number(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        requireChangePassword: false,
        accessToken: faker.random.uuid(),
        tokenExpireAt: faker.date.future(),
        refreshToken: faker.random.uuid(),
        refreshTokenExpireAt: faker.date.future(),
    });
});

app.put("/pepo-control/users/:id/change-password", async (req, res) => {
    await delay(2000);

    res.json({
        updated: faker.random.boolean(),
    });
});

app.get("/pepo-control/attendances", async (req, res) => {
    await delay(2000);

    res.json(
        {
            totalElements: 5,
            content: Array.from({ length: 5 }, () => ({
                id: faker.random.number(),
                surgeryId: faker.random.number(),
                scheduleId: faker.random.number(),
                attendanceId: faker.random.number(),
                person: {
                    name: faker.name.firstName(),
                    birthDate: faker.date.past(),
                    sex: faker.random.arrayElement(["M", "F"]),
                },
                procedure: {
                    name: faker.random.word(),
                },
                professional: {
                    name: faker.name.firstName(),
                    crm: faker.random.number(),
                },
                currentStep: {
                    identification: faker.random.word(),
                    roomName: faker.random.word(),
                },
                status: faker.random.arrayElement([
                    "Scheduled",
                    "Running",
                    "Done",
                    "Canceled",
                    "Unknow",
                ]),
                lastUpdate: faker.date.recent(),
                hasMoreSteps: faker.random.boolean(),
            })),
        }
    );
});

app.get("/pepo-control/attendances/status", async (req, res) => {
    await delay(2000);

    res.json({
        id: faker.random.number(),
        surgeryId: faker.random.number(),
        attendanceId: faker.random.number(),
        person: {
            name: faker.name.firstName(),
            birthDate: faker.date.past(),
            sex: faker.random.arrayElement(["M", "F"]),
        },
        procedure: {
            name: faker.random.word(),
        },
        professional: {
            name: faker.name.firstName(),
            crm: faker.random.number(),
        },
        currentStep: {
            identification: faker.random.word(),
            roomName: faker.random.word(),
        },
        status: faker.random.arrayElement([
            "Scheduled",
            "Running",
            "Done",
            "Canceled",
            "Unknow",
        ]),
        scheduledTo: faker.date.recent(),
        hasMoreSteps: faker.random.boolean(),
        lastUpdate: faker.date.recent(),
        nextStages: Array.from({ length: 5 }, () => ({
            identification: faker.random.word(),
            key: faker.random.number(),
            hasMoviment: faker.random.boolean(),
            targets: Array.from({ length: 5 }, () => ({
                key: faker.random.number(),
                sectorKey: faker.random.number(),
                basicUnit: faker.random.word(),
                complementaryUnit: faker.random.word(),
            }))
        })),
        timeline: Array.from({ length: 5 }, () => ({
            key: faker.random.uuid(),
            identification: faker.random.word(),
            order: faker.random.number(),
            status: faker.random.arrayElement([
                "Scheduled",
                "Running",
                "Done",
                "Canceled",
                "Unknow",
            ]),
            startedAt: faker.date.recent(),
            endedAt: faker.date.recent(),
        })),
    });
});

app.post("/pepo-control/attendances/done-step", async (req, res) => {
    await delay(2000);

    res.json({
        id: faker.random.number(),
        person: {
            name: faker.name.firstName(),
            birthDate: faker.date.past(),
            sex: faker.random.arrayElement(["M", "F"]),
        },
        procedure: {
            name: faker.name.firstName(),
        },
        professional: {
            name: faker.name.firstName(),
            crm: faker.random.number(),
        },
        currentStep: {
            identification: faker.random.uuid(),
            roomName: faker.random.word(),
        },
        status: faker.random.arrayElement([
            "Scheduled",
            "Running",
            "Done",
            "Canceled",
            "Unknow",
        ]),
        lastUpdate: faker.date.recent(),
        hasMoreSteps: faker.random.boolean(),
    });
});

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

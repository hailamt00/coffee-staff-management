CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;
INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260210021421_SyncWithSchema', '10.0.0');

COMMIT;

START TRANSACTION;
ALTER TABLE rewards_penalties ALTER COLUMN attendance_id DROP NOT NULL;

ALTER TABLE rewards_penalties ADD date timestamp with time zone NOT NULL DEFAULT TIMESTAMPTZ '-infinity';

ALTER TABLE rewards_penalties ADD reason text;

ALTER TABLE reward_penalty_types ADD default_amount numeric(12,2) NOT NULL DEFAULT 0.0;

ALTER TABLE rewards_penalties ADD CONSTRAINT "FK_rewards_penalties_attendance_attendance_id" FOREIGN KEY (attendance_id) REFERENCES attendance (id);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260210030541_UpdateRewardPenaltySchema', '10.0.0');

COMMIT;

START TRANSACTION;
ALTER TABLE revenues ADD "Expenses" numeric NOT NULL DEFAULT 0.0;

ALTER TABLE revenues ADD "Income" numeric NOT NULL DEFAULT 0.0;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260224052015_AddRevenueIncomeExpense', '10.0.0');

COMMIT;

START TRANSACTION;
ALTER TABLE revenues DROP COLUMN "Expenses";

ALTER TABLE revenues DROP COLUMN "Income";

ALTER TABLE rewards_penalties ADD reason text;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20260226031119_AddReasonToRewardPenaltyV2', '10.0.0');

COMMIT;


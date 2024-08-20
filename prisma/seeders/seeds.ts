import { seedRoles } from './role.seeder';
import { seedTrRoles } from './trRole.seeder';
import { seedUsers } from './user.seeder';

const main = async () => {
  try {
    await seedRoles();
    await seedUsers();
    await seedTrRoles();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

main().finally(() => {
  process.exit();
});

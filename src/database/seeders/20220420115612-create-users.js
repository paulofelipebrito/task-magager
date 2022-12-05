'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert(
       'users',
        [{
          name: 'Admin User',
          email: 'admin@example.app',
          password_hash: '$2b$05$EtlA4XWhAl5vu5YjZiFbY.KF51IzCPX2MgDs61nIU39jZ.vBlD0H2', //admin,
          role: 'admin',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Manager User',
          email: 'manager@example.app',
          password_hash: '$2b$05$Jlkm07ebQPKv/FLNb2JRoef80BYbarnfRMK1syI13X5oMX2H5R.wK', //manager,
          role: 'manager',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Developer User',
          email: 'dev@example.app',
          password_hash: '$2b$05$Q/dbXcJI7vQ/kB5HkPp0iO8OJuDfg/nM3XxV2CAfFboQIZtFPUW3i', //developer,
          role: 'developer',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date(),
        }],
     {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

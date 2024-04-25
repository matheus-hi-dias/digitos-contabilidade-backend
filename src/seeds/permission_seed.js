/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('permission').del()

  await knex('permission').insert([
    {permission: 'SEE_DOCUMENTS'},
    {permission: 'CREATE_DOCUMENTS'},
    {permission: 'UPDATE_DOCUMENTS'},
    {permission: 'DELETE_DOCUMENTS'},
    {permission: 'SEE_CLIENTS'},
    {permission: 'CREATE_CLIENTS'},
    {permission: 'UPDATE_CLIENTS'},
    {permission: 'DELETE_CLIENTS'},
    {permission: 'SEE_DOCUMENT_TYPES'},
    {permission: 'CREATE_DOCUMENT_TYPES'},
    {permission: 'UPDATE_DOCUMENT_TYPES'},
    {permission: 'DELETE_DOCUMENT_TYPES'},
    {permission: 'SEE_DOCUMENT_NATURES'},
    {permission: 'CREATE_DOCUMENT_NATURES'},
    {permission: 'UPDATE_DOCUMENT_NATURES'},
    {permission: 'DELETE_DOCUMENT_NATURES'},
    {permission: 'SEE_DOCUMENT_LOCATION'},
    {permission: 'CREATE_DOCUMENT_LOCATION'},
    {permission: 'UPDATE_DOCUMENT_LOCATION'},
    {permission: 'DELETE_DOCUMENT_LOCATION'},
    {permission: 'SEE_USERS'},
    {permission: 'CREATE_USERS'},
    {permission: 'UPDATE_USERS'},
    {permission: 'DELETE_USERS'},
  ]);
};

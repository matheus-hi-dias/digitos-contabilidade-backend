import { request } from "express";
import rolesService from "../services/rolesService.js";

const index = async (request, response, next) => {
  try {
    const roles = await rolesService.selectAll();
    response.status(200).json(roles);
  } catch (error) {
    next(error)
  }
}

const show = async (request, response, next) => {
  try {
    const { id } = request.params;
    const role = await rolesService.selectById(id);
    return response.status(200).json(role);
  } catch (error) {
    next(error);
  }
}

const store = async (request, response, next) => {
  try {
    const role = request.body;

    const newRole = await rolesService.create(role);
    response.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
}

const update = async (request, response, next) => {
  try {
    const {id }= request.params;
    const updatedRole = request.body;

    const updatedRoleResponse = await rolesService.update(id, updatedRole);
    response.status(200).json(updatedRoleResponse);
  } catch (error) {
    next(error);
  }
}

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;
    await rolesService.remove(id);
    response.status(200).json({message: 'Role deleted'});
  } catch (error) {
    next(error);
  }
}

export default {
  index,
  show,
  store,
  update, 
  remove
}
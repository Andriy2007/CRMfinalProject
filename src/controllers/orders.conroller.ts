import { NextFunction, Request, Response } from "express";
import ExcelJS from "exceljs";

import { IOrders } from "../interfaces/orders.interface";
import { orderService } from "../services/orders.service";
import {ApiError} from "../errors/api-error";
import {OrderStatusEnum} from "../enums/order.enum";


class OrderController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const result = await orderService.getList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const order = await orderService.getById(orderId);
      res.json(order);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const dto = req.body as Partial<IOrders>;
      const currentUser = res.locals.user;
      const order = await orderService.findOrderOrThrow(orderId);
      if (order.manager && order.manager.toString() !== currentUser._id.toString()) {
        throw new ApiError('Ви не маєте доступу до редагування цього ордера', 403);
      }
      if (!order.manager) {
        dto.manager = currentUser._id;
      }
      if (!dto.status || dto.status === null) {
        dto.status = OrderStatusEnum.InWork;
      }
      const updatedOrder = await orderService.updateById(orderId, dto);
      res.status(201).json(updatedOrder);
    } catch (e) {
      next(e);
    }
  }

  public async exportToExcel(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const result = await orderService.getList(query);
      const orders = result.data;
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for the export.' });
      }
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Orders');
      worksheet.columns = [
        { header: 'ID', key: '_id', width: 30 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Surname', key: 'surname', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'Age', key: 'age', width: 10 },
        { header: 'Course', key: 'course', width: 20 },
        { header: 'Course Format', key: 'course_format', width: 20 },
        { header: 'Course Type', key: 'course_type', width: 20 },
        { header: 'Status', key: 'status', width: 20 },
        { header: 'Sum', key: 'sum', width: 20 },
        { header: 'Already Paid', key: 'alreadyPaid', width: 20 },
        { header: 'Created At', key: 'created_at', width: 30 },
        { header: 'Group', key: 'group', width: 20 },
        { header: 'Manager', key: 'manager', width: 30 },
        { header: 'Message', key: 'msg', width: 50 },
        { header: 'UTM', key: 'utm', width: 20 },
      ];
      orders.forEach(order => {
        worksheet.addRow({
          _id: order._id,
          name: order.name,
          surname: order.surname,
          email: order.email,
          phone: order.phone,
          age: order.age,
          course: order.course,
          course_format: order.course_format,
          course_type: order.course_type,
          status: order.status,
          sum: order.sum,
          alreadyPaid: order.alreadyPaid,
          created_at: order.created_at,
          group: order.group,
          manager: order.manager,
          msg: order.msg,
          utm: order.utm,
        });
      });
      res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      console.error('Export error:', e);
      next(e);
    }
  }
}

export const orderController = new OrderController();

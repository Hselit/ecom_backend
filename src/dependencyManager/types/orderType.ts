const OrderTypes = {
  OrderController: Symbol.for("OrderController"),
  OrderService: Symbol.for("OrderService"),
  OrderRepository: Symbol.for("OrderRepository"),
  OrderItemController: Symbol.for("OrderItemController"),
  OrderItemService: Symbol.for("OrderItemService"),
  OrderItemRepository: Symbol.for("OrderItemRepository"),
  PaymentController: Symbol.for("PaymentController"),
  PaymentService: Symbol.for("PaymentService"),
  PaymentRepository: Symbol.for("PaymentRepository")
}

export default OrderTypes;


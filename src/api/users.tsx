import { Order, User, Group, Sender, Transaction } from "../types";
import Axios from "../lib/Axios";

export async function getCurrentUser(): Promise<User> {
  
  const response = await Axios.get("/v1/user")

  return response.data;
}

export async function logout() {
  const response = await Axios.delete("user");

  return response.data.data;
}

export async function listGroups(): Promise<Group[]> {
  const response = await Axios.get("/v1/groups")

  return response.data.data;
}

export async function deleteGroup(groupId: string): Promise<string> {
  const response = await Axios.delete("/v1/groups/"+groupId)

  return response.data.data;
}

export async function updateGroup(groupId: string, name: string): Promise<string> {
  const response = await Axios.patch("/v1/groups/"+groupId, {
    "name": name
  })

  return response.data.data;
}

export async function addGroup(name: string): Promise<Group> {
  const response = await Axios.post("/v1/groups", {
    "name": name
  })

  return response.data.data;
}

export async function uploadContact(data: FormData): Promise<string> {
  const response = await Axios.post("/v1/contacts/import", data)

  return response.data.data;
}

export async function listOrder(): Promise<Order[]> {
  const response = await Axios.get("/v1/supplies")

  return response.data.data;
}

export async function addOrder(sms_command: number): Promise<Order> {
  const response = await Axios.post("/v1/supplies", {
    "sms_command": sms_command
  })

  return response.data.data;
}

export async function deleteOrder(orderId: string): Promise<string> {
  const response = await Axios.delete("/v1/supplies/"+orderId)

  return response.data.data;
}

export async function updateOrder(orderId: string, sms_command: number): Promise<string> {
  const response = await Axios.patch("/v1/supplies/"+orderId, {
    "sms_command": sms_command
  })

  return response.data.data;
}

export async function listSender(): Promise<Sender[]> {
  const response = await Axios.get("/v1/senders")

  return response.data.data;
}

export async function addSender(name: string): Promise<Sender> {
  const response = await Axios.post("/v1/senders", {
    "name": name.toLocaleUpperCase()
  })

  return response.data.data;
}

export async function deleteSender(id: string): Promise<string> {
  const response = await Axios.delete("/v1/senders/"+id)

  return response.data.data;
}

export async function updateSender(id: string, name: string): Promise<string> {
  const response = await Axios.put("/v1/senders/"+id, {
    "name": name.toLocaleUpperCase()
  })

  return response.data.data;
}

export async function listTransaction(): Promise<Transaction[]> {
  const response = await Axios.get("/v1/transactions")

  return response.data.data;
}

export async function addTransaction(phone: string[], qty: number, sender_id: number, message: string, airtime: number): Promise<string> {
  const response = await Axios.post("/v1/transactions", {
    "phone": phone,
    "qty": qty,
    "sender_id": sender_id,
    "message": message,
    "airtime": airtime
  })

  return response.data.data;
}

export async function balanceTransaction(): Promise<any> {
  const response = await Axios.get("/v1/transactions/balances")

  return response.data.data;
}
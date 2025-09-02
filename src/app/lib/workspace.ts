import { AppDataType } from "../context/AppDataContext";
import { connectToDatabase } from "./mongo";


export const getWorkspace = async (domain: string | undefined): Promise<AppDataType | null> => {
  const { client } = await connectToDatabase();
  const doc = await client.db('users').collection("workspace").findOne({ "domain_info.domain": domain });
  if (!doc) return null;

  return {
    _id: doc._id.toString(),
    name: doc.name || "",
    terms: doc.terms || "",
    description: doc.description || "",
    unique_id: doc.unique_id || "",
    created_at: doc.created_at || "",
    updated_at: doc.updated_at || "",
    is_active: doc.is_active || false,
    permissions: doc.permissions || [],
    address_info: doc.address_info || {},
    basic_info: doc.basic_info || {},
    contact_info: {
      official_email: doc.contact_info?.official_email || "",
      support_email: doc.contact_info?.support_email || "",
      phone_number: doc.contact_info?.phone_number || [],
      fax_number: doc.contact_info?.fax_number || "",
    },
    social_info: doc.social_info || {},
    domain_info: doc.domain_info || {},
    message_info: doc.message_info || {},
  };
};

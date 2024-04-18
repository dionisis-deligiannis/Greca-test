
import { NextApiRequest, NextApiResponse } from 'next';


interface FormData {
  firstName: string;
  email: string;
  ageGroup: string;
  address: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        
        const { firstName, email, ageGroup, address }: FormData = req.body;
  
        // Server-side validation using Yup (if needed)
        // Add your validation logic here
  
        // Simulate processing form data
        // In this example, we simply return the submitted data
        res.status(200).json({ message: 'Form submitted successfully', data: { firstName, email, ageGroup, address } });
      } catch (error) {
        // Handle errors
        res.status(400).json({ message: 'Error: '  });
      }
    } else {
      // Return Method Not Allowed for non-POST requests
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
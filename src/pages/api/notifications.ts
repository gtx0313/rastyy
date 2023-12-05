import { NextApiRequest, NextApiResponse } from 'next/types';
import { sendNotificationsToUsers } from '../../models_helpers/notifications_helpers';

import { withAuth } from '../../_firebase/firebase_admin_auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, body } = req.body;
      if (!title || !body) throw new Error('Title and body must be provided');
      await sendNotificationsToUsers({ title: title, body: body });
      res.status(200).json({ message: 'Notification sent' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default withAuth(handler);

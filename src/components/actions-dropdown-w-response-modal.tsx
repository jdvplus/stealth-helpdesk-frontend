'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

import { DatabaseTicket } from '@/lib/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ActionsDropDownWithResponseModal({
  ticket,
}: {
  ticket: DatabaseTicket;
}) {
  /* state variables */
  const [supportTeamResponse, setSupportTeamResponse] = useState<string>('');
  const [draftSavedMessage, setDraftSavedMessage] = useState<string>('');
  const [ticketResolved, setTicketResolved] = useState<boolean>(false);
  const [sampleEmail, setSampleEmail] = useState<string>('');

  /**
   * saveDraft: makes an HTTP 'PATCH' request to api to update a ticket.
   */
  const saveDraft = async (): Promise<void> => {
    try {
      const res = await fetch(`${apiUrl}/saveDraft/${ticket._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supportTeamResponse }),
      });
      const data = await res.json();

      setDraftSavedMessage(data);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * sendResponse: makes an HTTP 'PATCH' request to api to resolve a ticket.
   */
  const sendResponse = async (): Promise<void> => {
    try {
      await fetch(`${apiUrl}/resolve/${ticket._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supportTeamResponse }),
      });

      setSampleEmail(supportTeamResponse);
      setSupportTeamResponse('');
      setTicketResolved(true);
    } catch (err) {
      console.error(err);
    }
  };

  /* component display */
  return (
    <Dialog
      onOpenChange={() => {
        setSampleEmail('');
        setTicketResolved(false);
        setDraftSavedMessage('');
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem className='cursor-pointer'>
              Respond to user
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-2'>Write a response</DialogTitle>

          <Textarea
            placeholder='Please include a response here.'
            rows={5}
            onChange={(e) => setSupportTeamResponse(e.target.value)}
            value={supportTeamResponse}
          />

          <DialogDescription className='italic'>
            You may save a draft of your reponse if you wish. <br />
            (This will automatically update the ticket's status to "in
            progress".)
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type='submit' onClick={sendResponse}>
            Send response
          </Button>
          <Button type='submit' variant='secondary' onClick={saveDraft}>
            Save draft
          </Button>
        </DialogFooter>

        {ticketResolved && (
          <div>
            <div className='mb-4'>Response sent!</div>
            <p className='text-xs'>
              From: support@stealthstartup.com <br />
              To: {ticket.name} | {ticket.email} <br />
              <br />
              Message: <br />
              {sampleEmail}
            </p>
          </div>
        )}
        {draftSavedMessage && <div>{draftSavedMessage}</div>}
      </DialogContent>
    </Dialog>
  );
}

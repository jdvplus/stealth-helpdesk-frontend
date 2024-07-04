'use client';

/* deps */
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

/* components */
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// TODO: figure this out
const apiUrl =
  process.env.API_URL || 'https://zealthy-helpdesk-backend-jdv724.vercel.app';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name cannot be longer than 50 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  description: z.string().min(1, {
    message: "Please include a description of what you'd like help with.",
  }),
});

export default function TicketSubmissionForm() {
  const [successMessage, setSuccessMessage] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    const { name, email, description } = values;

    const res = await fetch(`${apiUrl}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, description }),
    });
    const data = (await res.json()) as string;

    setSuccessMessage(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* field #1: name */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Jane Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* field #2: email address */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder='jane.doe@gmail.com'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* field #3: description of issue */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a detailed description of what you'd like help with."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-2'>
          Submit
        </Button>

        {successMessage && <div>{successMessage}</div>}
      </form>
    </Form>
  );
}

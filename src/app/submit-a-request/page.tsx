'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';

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

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// use Zod for form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name cannot be longer than 50 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  description: z
    .string()
    .min(1, {
      message: "Please include a description of what you'd like help with.",
    })
    .max(500, { message: 'Description must be 500 characters or less.' }),
});

export default function TicketSubmissionForm() {
  /* state variables */
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  });

  // reset form values after successful submission of ticket
  useEffect(() => {
    form.reset();
  }, [submitSuccess]);

  /**
   * onSubmit: makes an HTTP 'POST' request to api to submit a ticket to the database.
   * @param values - submitted form values
   */
  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    const { name, email, description } = values;

    try {
      const res = await fetch(`${apiUrl}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, description }),
      });
      const data = (await res.json()) as string;

      setSubmitSuccess(true);
      setSuccessMessage(data);

      // clear success message after 10 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setSuccessMessage('');
      }, 10000);
    } catch (err) {
      console.error(err);
    }
  };

  /* component display */
  return (
    <div className='w-1/2 mx-auto mt-12'>
      {/* header */}
      <h1 className='text-3xl font-bold text-center text-black mb-2'>
        Need help with something?
      </h1>
      <h2 className='text-xl text-center text-black mb-8'>
        Send us a message!
      </h2>

      {/* user submission form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* field #1: name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='mb-4'>
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
              <FormItem className='mb-4'>
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
              <FormItem className='mb-4'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a detailed description of what you'd like help with."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>

          {successMessage && (
            <div className='mt-6 font-bold text-blue-800 text-center'>
              {successMessage}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
